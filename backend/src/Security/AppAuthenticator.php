<?php
/*
namespace App\Security;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Http\Authenticator\AbstractAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Credentials\PasswordCredentials;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Core\Exception\BadCredentialsException;
use Symfony\Component\Security\Http\Authenticator\Passport\SelfValidatingPassport;

class AppAuthenticator extends AbstractAuthenticator
{
    private JWTTokenManagerInterface $jwtManager;
    private UserProviderInterface $userProvider;

    public function __construct(JWTTokenManagerInterface $jwtManager, UserProviderInterface $userProvider)
    {
        $this->jwtManager = $jwtManager;
        $this->userProvider = $userProvider;
    }

    public function supports(Request $request): ?bool
    {
        // ✅ Si on est sur /api/login en POST => authentification par email & password
        if ($request->getPathInfo() === '/api/login' && $request->isMethod('POST')) {
            return true;
        }

        // ✅ Si le cookie JWT est présent => authentification par token
        if ($request->cookies->has('cineclub-token')) {
            return true;
        }

        return false;
    }

    public function authenticate(Request $request): Passport
    {
        // 🔑 CAS 1 : Authentification via email/password (login)
        if ($request->getPathInfo() === '/api/login' && $request->isMethod('POST')) {
            $data = json_decode($request->getContent(), true);

            if (!isset($data['email']) || !isset($data['password'])) {
                throw new AuthenticationException('Email or password is missing.');
            }

            return new Passport(
                new UserBadge($data['email'], fn($userIdentifier) => $this->userProvider->loadUserByIdentifier($userIdentifier)),
                new PasswordCredentials($data['password'])
            );
        }

        // 🔑 CAS 2 : Authentification via le token (pour /api/check-token et autres routes)
        $token = $request->cookies->get('cineclub-token');

        if (!$token) {
            throw new AuthenticationException('No JWT token found.');
        }

        return new SelfValidatingPassport(new UserBadge($token, function ($jwt) {
            $payload = $this->jwtManager->parse($jwt);

            if (!isset($payload['email'])) {
                throw new AuthenticationException('Invalid JWT token payload.');
            }

            $user = $this->userProvider->loadUserByIdentifier($payload['email']);

            if (!$user) {
                throw new AuthenticationException('User not found.');
            }

            return $user;
        }));
    }


    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response
    {
        $jwt = $this->jwtManager->create($token->getUser());

        $cookie = Cookie::create('cineclub-token')
            ->withValue($jwt)
            ->withHttpOnly(true)
            ->withSecure(false)  // ➡️ Passe à true en production
            ->withSameSite('lax')
            ->withPath('/')
            ->withExpires(new \DateTime('+7 days'));

        $response = new JsonResponse(['message' => 'Connexion réussie.']);
        $response->headers->setCookie($cookie);

        return $response;
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): ?Response
    {
        return new JsonResponse(['message' => 'Identifiants invalides.'], Response::HTTP_UNAUTHORIZED);
    }
}

*/