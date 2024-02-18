<?php

namespace App\Service\Utils\PDF\Templates;

use App\Service\Utils\PDF\Core\HtmlToPdfInterface;

class HtmlExempleToPdf implements HtmlToPdfInterface
{
    /**
     * Get css reset. Is not mendatory to includ it
     * @return string 
     */
    private function getReset(): string
    {
        return file_get_contents(dirname(__DIR__, 1) . '/config/styles/resetCss.php');
    }

    public function getCss(): string
    {
        return '
        <style>
            ' . $this->getReset() . '
            @page {
                size: portrait;
                margin: 30px;
            }
            body {
                font-family: \'Inter\', sans-serif;
                font-size: 14px;
                font-weight: 400;
                color: #111111;
            }
            h1 { font-size: 28px; margin-bottom: 30px; }
            img { margin-bottom: 30px; }
            p { font-style: italic; }
        </style>
        ';
    }

    public function getTemplate(array $data, string $title = 'pdf'): string
    {
        return '
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>' . $title . '</title>
        </head>
        <body>
            ' . $this->getCss() . '
            <h1>' . $data['title'] . '</h1>
            <img src="../public/assets/images/logo.svg" alt="logo">
            <p>Je suis un paragraphe</p>
        </body>
        </html>
        ';
    }
}
