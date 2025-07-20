<?php

namespace App\Controller;

use App\Entity\Post;
use App\Entity\Image;
use App\Entity\PostEvaluation;
use App\Entity\ImageEvaluation;
use App\Exception\UnauthorizedException;
use Doctrine\ORM\EntityManagerInterface;
use ApiPlatform\Api\IriConverterInterface;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\Exception\AccessDeniedException;

class EvaluationController extends AbstractController
{

    public function __construct(private Security $security)
    {
       
    }

    public function __invoke(Request $request,EntityManagerInterface $entityManager,IriConverterInterface $iriConverter)
    {
        $postedEvaluation=json_decode($request->getContent());
        // dd($postedEvaluation);
        $evaluableIri = $postedEvaluation->evaluable;
        $evaluable = $iriConverter->getResourceFromIri($evaluableIri);
        $currentUser = $this->security->getUser();
        $evaluation=null;
        if($evaluable instanceof Post){
            $evaluation = new PostEvaluation();
            $evaluation->setPost($evaluable);
            $evaluation->setNote($postedEvaluation->note);
            $evaluation->setAuthor($currentUser);
            $evaluable->setEvaluationCount($evaluable->getEvaluationCount()+1)->setEvaluationSum($evaluable->getEvaluationSum()+$postedEvaluation->note);
        }elseif($evaluable instanceof Image){
            $evaluation = new ImageEvaluation();
            $evaluation->setImage($evaluable);
            $evaluation->setNote($postedEvaluation->note);
            $evaluation->setAuthor($currentUser);
        }

        return $evaluation;
    }
}
