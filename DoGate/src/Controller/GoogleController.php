<?php

namespace App\Controller;

use App\Entity\User;
use GuzzleHttp\Client;
use App\Entity\ProfilePicture;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpClient\HttpClient;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\String\Slugger\SluggerInterface;
use Vich\UploaderBundle\Handler\DownloadHandler;
use KnpU\OAuth2ClientBundle\Client\ClientRegistry;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Gesdinet\JWTRefreshTokenBundle\Entity\RefreshToken;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Gesdinet\JWTRefreshTokenBundle\Model\RefreshTokenManagerInterface;
use League\OAuth2\Client\Provider\Exception\IdentityProviderException;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Gesdinet\JWTRefreshTokenBundle\Generator\RefreshTokenGeneratorInterface;
use Vich\UploaderBundle\Handler\UploadHandler;


class GoogleController extends AbstractController
{

    public function __construct(
        private ClientRegistry $clientRegistry,
        private EntityManagerInterface $entityManager,
        private JWTTokenManagerInterface $jwtManager, // Ajoutez ContainerInterface ici
        private RefreshTokenGeneratorInterface $refreshTokenGenerator,
        private RefreshTokenManagerInterface $refreshTokenManager,
        private ValidatorInterface $validator,
        private DownloadHandler $downloadHandler,
        private UploadHandler $uploadHandler
    ) {
    }

    #[Route('/connect/{provider}', name: 'connect_social')]
    public function connectAction(ClientRegistry $clientRegistry, Request $request)
    {
        //Redirect to google
        return $clientRegistry->getClient($request->attributes->get('provider'))->redirect($request->attributes->get('provider')==='linkedin' ? ['openid','profile','email'] : [], []);
    }


    /**
     * After going to Google, you're redirected back here
     * because this is the "redirect_route" you configured
     * in config/packages/knpu_oauth2_client.yaml
     */
    #[Route('/connect/{provider}/check', name: 'connect_social_check')]
    public function connectCheckAction(Request $request, ClientRegistry $clientRegistry, RefreshTokenManagerInterface $refreshTokenManager, SluggerInterface $slugger)
    {

        $provider = $request->attributes->get('provider');
        $client = $clientRegistry->getClient($provider);
        $providerMappings = [
            'google' => 'Google',
            'facebook' => 'Fb',
            'linkedin' => 'Linkedin'
        ];
        $providerName = $providerMappings[$provider] ?? $providerMappings['google'];


        try {
            $socialUser = $client->fetchUser();

            if (
                $existUser = $this->entityManager->getRepository(User::class)->findOneBy([
                    strtolower($providerName) . "Id" => $socialUser->getId()
                ])
            ) {
                $user = $existUser;
            } else {
                switch ($providerName) {
                    case 'Google':
                        $picture = $socialUser->toArray()['picture'];
                        break;
                    case 'Fb':
                        $picture = $socialUser->getPictureUrl();
                        break;
                }

                if (isset($picture)) {
                    $client = new Client();
                    $response = $client->get($picture);
                    $tempFilePath = sys_get_temp_dir() . '/externalimage.jpg';
                    file_put_contents($tempFilePath, $response->getBody());
                    $picFile = new File($tempFilePath);
                }
                $user = new User();


                $user
                    ->setFirstName(explode(' ', $socialUser->getName())[0])
                    ->setLastName(explode(' ', $socialUser->getName())[1])
                    ->setEmail($socialUser->getEmail());
                $this->entityManager->persist($user);
                if (isset($picFile)) {
                    try {

                        $profilePic = new ProfilePicture();


                        $originalFilename = pathinfo($picFile->getFilename(), PATHINFO_FILENAME);
                        // this is needed to safely include the file name as part of the URL
                        $safeFilename = $slugger->slug($originalFilename);
                        $newFilename = $safeFilename . '-' . uniqid() . '.' . $picFile->guessExtension();
                        $profilePic->setFile($picFile)
                            ->setUser($user)
                            ->setFolder('profilePictures')
                            ->setFileName($newFilename)
                            ->setFileSize($picFile->getSize());
                        $this->entityManager->persist($profilePic);

                        // Move the file to the directory where brochures are stored
                        try {
                            $picFile->move($this->getParameter('kernel.project_dir') . '/public/upload/img/profilePictures', $newFilename);
                        } catch (FileException $e) {
                            dd($e);
                        }






                        $user->setActiveProfilePicture($profilePic);

                    } catch (\Exception $e) {
                        dd($e);
                    }



                }
                $user->{"set{$providerName}Id"}($socialUser->getId());



                $this->entityManager->flush();
            }


            $token = $this->jwtManager->create($user);
            $cookie = Cookie::create('BEARER')
                ->withValue($token)
                ->withPath('/')
                ->withHttpOnly(false)
                ->withSecure(true);

            $refreshToken = $this->refreshTokenGenerator->createForUserWithTtl($user, 86400);
            $this->refreshTokenManager->save($refreshToken);



            // Ajoutez le refresh token dans un cookie
            $refreshCookie = Cookie::create('refresh_token')
                ->withValue($refreshToken->getRefreshToken())
                ->withPath('/')
                ->withHttpOnly(false)
                ->withSecure(true);

            // Rediriger l'utilisateur vers le front-end React avec le cookie
            $response = new RedirectResponse('https://localhost:3000');
            $response->headers->setCookie($cookie);
            $response->headers->setCookie($refreshCookie);
        } catch (IdentityProviderException $e) {
            // something went wrong!
            // probably you should return the reason to the user
            var_dump($e->getMessage());
            die;
        }

        // Créer un cookie sécurisé pour stocker le token


        return $response;
    }
}
