<?php

namespace App\Service\Utils\Upload;

use LogicException;
use InvalidArgumentException;
use Symfony\Component\String\Slugger\SluggerInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\Mime\Exception\LogicException as ExceptionLogicException;

/**
 * class UploadService
 * @package App\Service\Utils\Upload
 */
class UploadService 
{
    /**
     * @var string
     */
    private string $uploadsDirectory;

    /**
     * @var SluggerInterface
     */
    private SluggerInterface $slugger;

    public function __construct(SluggerInterface $slugger, string $uploadsDirectory)
    {
        $this->slugger = $slugger;
        $this->uploadsDirectory = $uploadsDirectory;
    }

    /**
     * Get uploads folder directory
     * 
     * @return string 
     */
    private function getUploadDirectory()
    {
        return $this->uploadsDirectory;
    }

    /**
     * Method to upload file on server
     * @param null|UploadedFile $file 
     * @param string|null $folder 
     * @return string|void 
     * @throws LogicException 
     * @throws InvalidArgumentException 
     * @throws ExceptionLogicException 
     * @throws FileException 
     */
    public function processFile(?UploadedFile $file, string $folder = null)
    {
        if ($file) {
            $originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $safeFilename = $this->slugger->slug($originalFilename);
            $newFilename = $safeFilename . '-' . uniqid() . '.' . $file->guessExtension();
            try {
                $path = $this->getUploadDirectory() . '/' . $folder;

                if (!file_exists($path)) {
                    mkdir($path, 0777, true);
                }

                $file->move($path, $newFilename);
            } catch (FileException $e) {
                throw new FileException($e->getMessage());
            }
            return $newFilename;
        }
    }
}
