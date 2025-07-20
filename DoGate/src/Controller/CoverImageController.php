<?php

namespace App\Controller;

use ApiPlatform\Api\IriConverterInterface;
use App\Entity\CoverImage;
use App\Entity\ProfilePicture;
use App\Doctrine\CustomItemExtension;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Request;
use Vich\UploaderBundle\Handler\UploadHandler;
use ApiPlatform\Doctrine\Orm\Util\QueryNameGenerator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use ApiPlatform\Doctrine\Orm\Extension\QueryResultItemExtensionInterface;



class CoverImageController extends AbstractController
{

    public function __construct(private Security $security,private IriConverterInterface $iriConverter)
    {
    }

    public function __invoke(Request $request):CoverImage
    {
        $uploadedFile = $request->files->get('file');
        if (!$uploadedFile) {
            throw new BadRequestHttpException('"file" is required');
        }
        $mediaObject = new CoverImage();
        if($authorIri=$request->request->get('author')){
            $author=$this->iriConverter->getResourceFromIri($authorIri);
            $mediaObject->setAuthor($author);
        }
        $mediaObject->setFile($uploadedFile);
        $mediaObject->setFolder('coverImage');

        return $mediaObject;
    }
}
