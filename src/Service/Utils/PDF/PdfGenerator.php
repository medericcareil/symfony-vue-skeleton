<?php

namespace App\Service\Utils\PDF;

use App\Service\Utils\PDF\Core\PdfGeneratorInterface;
use Mpdf\Mpdf;
use Mpdf\Config\ConfigVariables;
use Mpdf\Config\FontVariables;

/**
 * class PdfGenerator
 * @package App\Service\Utils\PDF
 */
class PdfGenerator implements PdfGeneratorInterface
{
    /**
     * Method to generate pdf
     * 
     * @param string $html An html template define in Templates folder
     * @param string $name Your pdf name
     * @param string $outputType Output type 'I' to show, 'D' to download
     * @return void
     */
    public function generatePdf(string $html, string $name, string $outputType): void
    {
        $defaultConfig = (new ConfigVariables())->getDefaults();
        $fontDirs = $defaultConfig['fontDir'];

        $defaultFontConfig = (new FontVariables())->getDefaults();
        $fontData = $defaultFontConfig['fontdata'];

        $mpdf = new Mpdf([
            'fontDir' => array_merge($fontDirs, [
                __DIR__ . "/config/fonts",
            ]),
            'fontdata' => $fontData + [
                'inter' => [
                    'R' => 'Inter-Regular.ttf',
                    'B' => 'Inter-Bold.ttf',
                ]
            ],
            'default_font' => 'arial'
        ]);
        $mpdf->WriteHTML($html);
        $mpdf->Output('' . $name . '', $outputType);
    }
}
