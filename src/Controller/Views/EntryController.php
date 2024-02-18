<?php

namespace App\Controller\Views;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class EntryController extends AbstractController
{
    #[Route('/', name: 'app_entry')]
    #[Route('/{route}', name: 'app_views', requirements: ['route' => '^.+'])]
    public function entry(): Response
    {
        return $this->render('base.html.twig');
    }
}
