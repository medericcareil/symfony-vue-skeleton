<?php

namespace App\Kernel;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

abstract class AbstractApiController extends AbstractController {
    /**
     * Returns a failure response with optionnal data (Code: 200)
     * @param mixed $data 
     * @param int $status
     * @return JsonResponse 
     */
    protected function failure($data = null, int $status = Response::HTTP_BAD_REQUEST): JsonResponse
    {
        $response = ['status_code' => $status];

        if ($data) {
            $response['data'] = $data;
        }

        return $this->json($response, $status);
    }
}
