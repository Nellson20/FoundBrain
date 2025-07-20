<?php

namespace App\Security;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Exception\BadCredentialsException;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Http\Authenticator\AbstractAuthenticator;
use Symfony\Component\Security\Http\Authenticator\JsonLoginAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\SelfValidatingPassport;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAuthenticationException;
use Symfony\Component\Security\Http\Authenticator\Passport\Credentials\PasswordCredentials;

class UserAuthenticator extends AbstractAuthenticator
{

    public function supports(Request $request): ?bool
    {
        return true;
    }

    public function authenticate(Request $request): Passport
    {
        $credentials=json_decode($request->getContent());
        
        if(empty($credentials->identifier) || empty($credentials->password) || !isset($credentials->identifier) || !isset($credentials->password)){
            throw new CustomUserMessageAuthenticationException("Tous les champs sont obligatoire !");
        }

        return new Passport(new UserBadge($credentials->identifier),new PasswordCredentials($credentials->password),[]);
    }
    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response
    {
        return null;
    }
    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): Response|null
    {
        $message=strtr($exception->getMessageKey(), $exception->getMessageData());
        if ($exception instanceof BadCredentialsException) {
            $message="Identifiant ou mot de passe incorrect";
        }
        $data = [
            // you may want to customize or obfuscate the message first
            'message' => $message,
            // or to translate this message
            // $this->translator->trans($exception->getMessageKey(), $exception->getMessageData())
        ];
        return new JsonResponse($data, Response::HTTP_UNAUTHORIZED);
    }

}