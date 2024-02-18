<?php

namespace App\Service\API\Auth;

use App\Entity\User;
use App\Repository\UserRepository;
use Exception;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Exception\JWTDecodeFailureException;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;

/**
 * class AuthService
 * @package App\Service\API\Auth
 */
class AuthService {
    /**
     * @var JWTTokenManagerInterface
     */
    private JWTTokenManagerInterface $jwtManager;

    /**
     * @var TokenStorageInterface
     */
    private TokenStorageInterface $tokenStorageInterface;

    /**
     * @var UserRepository
     */
    private UserRepository $userRepository;

    public function __construct(
        JWTTokenManagerInterface $jwtManager, 
        TokenStorageInterface $tokenStorageInterface, 
        UserRepository $userRepository
    )
    {
        $this->jwtManager = $jwtManager;
        $this->tokenStorageInterface = $tokenStorageInterface;
        $this->userRepository = $userRepository;
    }

    /**
     * Get token from storage
     * @return TokenInterface 
     * @throws JWTDecodeFailureException 
     */
    public function getToken(): TokenInterface {
        return $this->tokenStorageInterface->getToken();
    }

    /**
     * Decrypt token
     * @return array 
     * @throws JWTDecodeFailureException 
     */
    public function decryptToken(): array {
        return $this->jwtManager->decode($this->getToken());
    }

    /**
     * Get user by username from token
     * @return User 
     * @throws JWTDecodeFailureException 
     * @throws Exception 
     */
    public function getUserByClaimsPrincipal(): User {
        $token = $this->decryptToken();
        $user = $this->userRepository->findOneBy(['email' => $token['username']]);
        if (!$user) {
            throw new \Exception('L\'utilisateur n\'existe pas');
        }
        return $user;
    } 
}
