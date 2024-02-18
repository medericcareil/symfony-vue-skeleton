<?php

namespace App\Service\Utils\PDF\Core;

/**
 * interface HtmlToPdfInterface
 * @package App\Service\Utils\PDF\Core
 */
interface HtmlToPdfInterface
{
    /**
     * Method to return pdf style
     * @return string 
     */
    public function getCss(): string;

    /**
     * Method to return pdf content
     * @param array $data 
     * @param string $title 
     * @return string 
     */
    public function getTemplate(array $data, string $title): string;
}
