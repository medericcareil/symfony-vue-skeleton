<?php

namespace App\Service\Utils\PDF\Core;

/**
 * interface PdfGeneratorInterface
 * @package App\Service\Utils\PDF\Core
 */
interface PdfGeneratorInterface
{
    /**
     * Method to generate pdf
     * 
     * @param string $html 
     * @param string $name 
     * @param string $outputType 
     * @return void 
     */
    public function generatePdf(string $html, string $name, string $outputType): void;
}
