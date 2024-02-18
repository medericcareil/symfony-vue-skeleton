<?php

namespace App\Controller\API\User;

use App\Entity\User;
use App\Kernel\AbstractApiController;
use App\Service\API\Auth\AuthService;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;

#[Route('/api/auth')]
class AuthController extends AbstractApiController
{
    /**
     * @var AuthService
     */
    private AuthService $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    /**
     * Get current connected user
     * @return JsonResponse
     */
    #[Route('/get-user', name: 'api_auth_get_user', methods: ['GET'])]
    public function getCurrentUser(): JsonResponse
    {
        try {
            $user = $this->authService->getUserByClaimsPrincipal();
            return $this->json(User::toArray($user));
        } catch (\Throwable $th) {
            return $this->failure($th->getMessage());
        }
    }
}
