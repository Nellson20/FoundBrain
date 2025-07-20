<?php

namespace App\Controller;

use App\Entity\Post;
use App\Entity\Image;
use App\Entity\Survey;
use App\Entity\Thumbnail;
use App\Entity\FileResource;
use Doctrine\ORM\EntityManagerInterface;
use ApiPlatform\Api\IriConverterInterface;
use Symfony\Component\HttpFoundation\Request;
use Vich\UploaderBundle\Handler\UploadHandler;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;


#[AsController]
class SurveyController extends AbstractController
{
    private $entityManager;
    private $uploadHandler;

    public function __construct(EntityManagerInterface $entityManager, UploadHandler $uploadHandler, private IriConverterInterface $iriConverter)
    {
        $this->entityManager = $entityManager;
        $this->uploadHandler = $uploadHandler;
    }

    public function __invoke(Request $req): Survey
    {
        $survey = new Survey();
        $requestSurvey = $req->request;
        $startDate=$requestSurvey->get(key: 'startDate');
        $limitDate=$requestSurvey->get(key: 'limitDate');
        // $choices=$re
        $survey->setTitle($requestSurvey->get(key: 'title'));
        if ($postIri = $requestSurvey->get(key: 'post')) {
            $survey->setPost($this->iriConverter->getResourceFromIri($postIri));
        }
        if($startDate){
            $survey->setStartDate(new \DateTimeImmutable($startDate));
        }
        if($limitDate){
            $survey->setLimitDate(new \DateTimeImmutable($limitDate));
        }

        return $survey;
    }
}
