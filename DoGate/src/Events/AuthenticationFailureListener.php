<?php

namespace App\Events;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\Exception\BadCredentialsException;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationFailureEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Response\JWTAuthenticationFailureResponse;


class AuthenticationFailureListener
{
    /**
     * @param AuthenticationFailureEvent $event
     */
    public function onAuthenticationFailureResponse(AuthenticationFailureEvent $event)
    {
        $exception= $event->getException();
        dd($exception);
        $message=strtr($exception->getMessageKey(), $exception->getMessageData());
        if ($exception instanceof BadCredentialsException) {
            $message="Identifiant ou mot de passe incorrect";
        }
        $response = new JWTAuthenticationFailureResponse($message);

        $event->setResponse($response);
    }
}
