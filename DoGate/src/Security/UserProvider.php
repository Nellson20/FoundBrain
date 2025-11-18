<?php

namespace App\Security;


use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAccountStatusException;

class UserProvider implements UserProviderInterface
{
    public function __construct(private UserRepository $userRepository) {
        
    }
    public function loadUserByIdentifier(string $identifier): UserInterface
    {
        return $this->fetchUser($identifier);
    }

    public function refreshUser(UserInterface $user)
    {
        if (!$user instanceof User) {
            throw new UnsupportedUserException(
                sprintf('Instances of "%s" are not supported.', get_class($user))
            );
        }

        $identifier = $user->getEmail();

        return $this->fetchUser($identifier);
    }

    public function supportsClass($class)
    {
        return User::class === $class || is_subclass_of($class, User::class);
    }

    private function fetchUser($identifier)
    {
        // make a call to your webservice here
        
        $user = $this->userRepository->findOneByEmailOrNumber($identifier);

        if ($user) {
            return $user;
        }

        throw new CustomUserMessageAccountStatusException('Identifiant ou mot de passe incorrect',[],JsonResponse::HTTP_BAD_REQUEST);
    }
}