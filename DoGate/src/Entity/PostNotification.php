<?php

namespace App\Entity;

use App\Entity\Post;
use App\Entity\User;
use App\Entity\Notification;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\Patch;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post as MetadataPost;
use App\Controller\Notification\AddPostNotificationAction;
use App\Repository\PostNotificationRepository;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: PostNotificationRepository::class)]
#[ApiResource(
    normalizationContext: [
        'groups' => ['notif_read'],
    ],
    operations: [
        
        new Put(),
        new Patch(),
        new MetadataPost(
            uriTemplate: '/post_notifications', 
            controller: AddPostNotificationAction::class,
            deserialize: false
        ),
    ]
)]
class PostNotification extends Notification
{
    #[ORM\ManyToOne(inversedBy: 'notifications')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['posts_read', 'image_read', 'eval_read','notif_read'])]
    private ?Post $post = null;


    public function getPost(): ?Post
    {
        return $this->post;
    }

    public function setPost(?Post $post): static
    {
        $this->post = $post;

        return $this;
    }

}
