<?php

namespace App\Security;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Contracts\Translation\TranslatorInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Contracts\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Lexik\Bundle\JWTAuthenticationBundle\Exception\ExpiredTokenException;
use Lexik\Bundle\JWTAuthenticationBundle\Exception\InvalidTokenException;
use Lexik\Bundle\JWTAuthenticationBundle\Exception\InvalidPayloadException;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Lexik\Bundle\JWTAuthenticationBundle\Exception\JWTDecodeFailureException;
use Lexik\Bundle\JWTAuthenticationBundle\TokenExtractor\TokenExtractorInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Security\Authenticator\JWTAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\SelfValidatingPassport;

class JsonAuthenticator extends JWTAuthenticator
{
    public function __construct(
        private JWTTokenManagerInterface $jwtManager,
        private EventDispatcherInterface $eventDispatcher,
        private TokenExtractorInterface $tokenExtractor,
        private UserProviderInterface $userProvider,
    ) {
    }
    public function supports(Request $request): ?bool
    {
        return true;
    }
    public function doAuthenticate(Request $request) : Passport
    {
        dd('okay');
        $token = $this->getTokenExtractor()->extract($request);
        if ($token === false) {
            throw new \LogicException('Unable to extract a JWT token from the request. Also, make sure to call `supports()` before `authenticate()` to get a proper client error.');
        }

        try {
            if (!$payload = $this->jwtManager->parse($token)) {
                throw new InvalidTokenException('Invalid JWT Token');
            }
        } catch (JWTDecodeFailureException $e) {
            if (JWTDecodeFailureException::EXPIRED_TOKEN === $e->getReason()) {
                throw new ExpiredTokenException();
            }

            throw new InvalidTokenException('Invalid JWT Token', 0, $e);
        }

        $idClaim = $this->jwtManager->getUserIdClaim();
        if (!isset($payload[$idClaim])) {
            throw new InvalidPayloadException($idClaim);
        }

        $passport = new SelfValidatingPassport(
            new UserBadge(
                (string)$payload[$idClaim],
                function ($userIdentifier) use ($payload) {
                    return $this->loadUser($payload, $userIdentifier);
                }
            )
        );

        $passport->setAttribute('payload', $payload);
        $passport->setAttribute('token', $token);

        return $passport;
    }
}