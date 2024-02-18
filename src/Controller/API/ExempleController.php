<?php

namespace App\Controller\API;

use App\Kernel\AbstractApiController;
use App\Service\Utils\PDF\PdfGenerator;
use App\Service\Utils\PDF\Templates\HtmlExempleToPdf;
use App\Service\Utils\Upload\UploadService;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;

#[Route('/api/exemple')]
class ExempleController extends AbstractApiController
{
    //=========================//
    //=== To inject service ===//
    //=========================//

    /**
     * @var PdfGenerator
     */
    private PdfGenerator $pdf;

    /**
     * @var HtmlExempleToPdf
     */
    private HtmlExempleToPdf $template;

    /**
     * @param PdfGenerator $pdf 
     * @param HtmlExempleToPdf $template 
     * @return void 
     */
    public function __construct(PdfGenerator $pdf, HtmlExempleToPdf $template)
    {
        $this->pdf = $pdf;
        $this->template = $template;
    }

    #[Route('/get-exemple', name: 'api_exemple', methods: ['GET'])]
    public function getExemple(): Response
    {
        try {
            // Exemple PdfGenerator using (you dont need to return anything)
            $this->pdf->generatePdf($this->template->getTemplate(['title' => 'Je suis un exemple de titre']), 'test1_78-ti.pdf', 'I');
            // Use your service inner try
            // return $this->json('Some data');
        } catch (\Throwable $th) {
            return $this->failure($th->getMessage() !== '' ? $th->getMessage() : 'Une erreur est survenue lors de la récuperation de l\'exemple');
        }
    }
}
