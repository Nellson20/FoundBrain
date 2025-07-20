<?php

namespace App\Controller;

use App\Entity\Post;
use App\Entity\Image;
use App\Entity\Survey;
use App\Entity\SurveyChoice;
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
class PostController extends AbstractController
{
    private $entityManager;
    private $uploadHandler;

    public function __construct(EntityManagerInterface $entityManager, UploadHandler $uploadHandler, private IriConverterInterface $iriConverter)
    {
        $this->entityManager = $entityManager;
        $this->uploadHandler = $uploadHandler;
    }

    public function __invoke(Request $req): Post
    {
    
        $post = new Post();
        $requestPost = $req->request;
        $survey=$requestPost->get('survey');

        // dd($survey);

        $post->setContent($requestPost->get(key: 'content'));
        if ($authorIri = $requestPost->get(key: 'author')) {
            $post->setAuthor($this->iriConverter->getResourceFromIri($authorIri));

        }
        
        $uploadedFiles = $req->files->get('file');
        if ($uploadedFiles) {
            $i = 0;
            foreach ($uploadedFiles as $uploadedFile) {
                $i = $i + 500;
                $mediaObject = new Thumbnail();
                $mediaObject->setCreatedAt((new \DateTimeImmutable())->modify("+$i second"));
                $mediaObject->setFile($uploadedFile);
                $mediaObject->setFolder('postThumb');
                $post->addThumbnail($mediaObject);
                $this->entityManager->persist($mediaObject);
                $image = new Image();
                $image->setImageEntity($mediaObject);
                $this->entityManager->persist($image);
            }
        } elseif ($survey) {
            $surveyObj=json_decode($survey);
            $survey = new Survey();
            // $startDate=$surveyObj->startDate ? new \DateTimeImmutable($surveyObj->startDate) : null;
            // $limitDate=$surveyObj->limitDate ? new \DateTimeImmutable($surveyObj->limitDate) : null;
            // $survey->setStartDate($startDate);
            // $survey->setLimitDate($limitDate);
            $survey->setTitle($surveyObj->title ?? null);
            if($surveyObj->choices){
                foreach($surveyObj->choices as $opt){
                    $c=new SurveyChoice();
                    $c->setTitle($opt->title ?? null);
                    $survey->addChoice($c);
                }
            }
            
            $post->setSurvey($survey);
        }

        return $post;
    }
}
