<?php

namespace App\Controller;

use App\Entity\Picture;
use App\Entity\Hotel;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Vich\UploaderBundle\Handler\UploadHandler;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class PictureController extends AbstractController
{
  
    private $entityManager;
    private $uploadHandler;

    public function __construct(EntityManagerInterface $entityManager, UploadHandler $uploadHandler)
    {
        $this->entityManager = $entityManager;
        $this->uploadHandler = $uploadHandler;
    }

    public function __invoke(Request $request)
    {

        $uploadedFile = $request->files->get('file');
        $requestData = $request->request->all();

        if (!$uploadedFile) {
            throw new BadRequestHttpException('"file" is required');
        }
        $mediaObject = new Picture();
        $mediaObject->setFile($uploadedFile);
        $mediaObject->setFolder('pictures');

        return $mediaObject;
    }
}