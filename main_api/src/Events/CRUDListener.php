<?php

namespace App\Events;

use App\Entity\CommentableEntity;
use App\Entity\Hotel;
use App\Entity\Company;
use App\Entity\ImageEvaluation;
use App\Entity\PostEvaluation;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Events;
use App\Entity\Comment;
use Symfony\Component\HttpKernel\Event\ResponseEvent;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Doctrine\Persistence\Event\LifecycleEventArgs;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use ApiPlatform\Symfony\EventListener\EventPriorities;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use App\Entity\VotreEntite; // Remplacez par le chemin de votre entité

class CRUDListener implements EventSubscriberInterface
{

    public function __construct(private Security $security, private EntityManagerInterface $manager)
    {
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => [
                ['checkEntityIsMine', EventPriorities::PRE_WRITE],
                ['preWrite', EventPriorities::PRE_WRITE],
                ['postWrite', EventPriorities::POST_WRITE],
                // ['preSerialize', EventPriorities::PRE_SERIALIZE],
                // ['checkDiscussionMembership', EventPriorities::POST_READ]
            ],
        ];
    }

    public function checkEntityIsMine(ViewEvent $event)
    {
        $entity = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();
        $connectedUser = $this->security->getUser();

        if ($entity instanceof Hotel && $method !== 'GET') {
            if (!($entity->getCompany() instanceof Company && $entity->getCompany()->getAuthor() === $connectedUser)) {
                throw new HttpException(Response::HTTP_UNAUTHORIZED, "Vous n'êtes pas autorisé à effectuer cette action.");
            }
        }
    }

    public function preWrite(ViewEvent $event)
    {
        $entity = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();
        if ($method === 'DELETE') {
            if ($entity instanceof Comment) {
                $commentable = $entity->getCommentable() ?? $entity->getParent();
                if ($commentable instanceof CommentableEntity) {
                    $commentable = $commentable->setCommentsCount((int) $entity->getCommentable()->getCommentsCount() - 1);

                } elseif ($commentable instanceof Comment) {
                    $commentable->setRepliesCount((int) $commentable->getRepliesCount() - 1);
                }

                $this->manager->persist($commentable);

            } elseif ($entity instanceof ImageEvaluation) {
                $image = $entity->getImage();
                $image->setEvaluationCount((int) $image->getEvaluationCount() - 1)
                    ->setEvaluationSum((int) $image->getEvaluationSum() - $entity->getNote());
                $this->manager->persist($image);
            } elseif ($entity instanceof PostEvaluation) {
                $post = $entity->getPost();
                $post->setEvaluationCount((int) $post->getEvaluationCount() - 1)
                    ->setEvaluationSum((int) $post->getEvaluationSum() - $entity->getNote());
                $this->manager->persist($post);
            }

            $this->manager->flush();
        }

    }

    public function postWrite(ViewEvent $event)
    {
        $entity = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();
        if($method === 'POST'){
            if ($entity instanceof Comment) {
                $commentable = $entity->getCommentable() ?? $entity->getParent();
                if ($commentable instanceof CommentableEntity) {
                    $commentable = $commentable->setCommentsCount($entity->getCommentable()->getCommentsCount() + 1);
    
                } elseif ($commentable instanceof Comment) {
                    $commentable->setRepliesCount($commentable->getRepliesCount() + 1);
                }
    
                $this->manager->persist($commentable);
    
            } elseif ($entity instanceof ImageEvaluation) {
                $image = $entity->getImage();
                $image->setEvaluationCount($image->getEvaluationCount() + 1)
                    ->setEvaluationSum($image->getEvaluationSum() + $entity->getNote());
                $this->manager->persist($image);
            } elseif ($entity instanceof PostEvaluation) {
                $post = $entity->getPost();
                $post->setEvaluationCount($post->getEvaluationCount() + 1)
                    ->setEvaluationSum($post->getEvaluationSum() + $entity->getNote());
                $this->manager->persist($post);
            }
    
            $this->manager->flush();
        }
        
    }

    // public function onPreSerialize(ViewEvent $event)
    // {
    //     $comment = $event->getControllerResult();
    //     if ($comment instanceof Comment) {
    //         $replies = $comment->getReplies();
    //         $comment->setReplies(array_slice($replies, 0, 1)); // Limite les réponses à 1
    //     }
    // }

    // public function checkDiscussionMembership(ViewEvent $event)
    // {
    //     dd('ntay');
    //     $request = $event->getRequest();

    //     if (!$attributes = RequestAttributesExtractor::extractAttributes($request)) {
    //         return;
    //     }

    //     // Vérifier si l'entité concernée est un message
    //     if ($attributes['resource_class'] !== Message::class || $request->getMethod() !== 'GET') {
    //         return;
    //     }

    //     // Récupérer l'ID de la discussion à partir de l'URL
    //     $discussionId = $request->attributes->get('id');

    //     // Vérifier ici si l'utilisateur actuel est membre de la discussion
    //     // Vous devrez implémenter votre propre logique d'autorisation ici
    //     // Supposons que vous avez une méthode 'isMemberOfDiscussion' dans votre service de sécurité
    //     $isMember = $this->security->isMemberOfDiscussion($discussionId);

    //     if (!$isMember) {
    //         throw new AccessDeniedException("Vous n'êtes pas autorisé à accéder à cette ressource.");
    //     }
    // }
}