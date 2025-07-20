<?php

namespace App\Entity;

use App\Controller\Notification\AddPostCommentNotificationAction;
use App\Entity\Notification;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\Patch;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post as MetadataPost;
use App\Repository\PostCommentNotificationRepository;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: PostCommentNotificationRepository::class)]
#[ApiResource(
    normalizationContext: [
        'groups' => ['notif_read'],
    ],
    operations: [
        
        new Put(),
        new Patch(),
        new MetadataPost(
            uriTemplate: '/post_comment_notifications',
            controller: AddPostCommentNotificationAction::class,
            deserialize: false
        ),
    ]
)]
class PostCommentNotification extends Notification
{
    #[ORM\ManyToOne(cascade:['persist','remove'])]
    #[Groups(['notif_read'])]
    private ?Comment $comment = null;

    public function getComment(): ?Comment
    {
        return $this->comment;
    }

    public function setComment(?Comment $comment): static
    {
        $this->comment = $comment;

        return $this;
    }
}
