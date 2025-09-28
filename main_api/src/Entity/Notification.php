<?php

namespace App\Entity;

use App\Entity\User;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Post as MetadataPost;
use ApiPlatform\Metadata\Link;
use App\Config\NotificationType;
use App\Entity\PostNotification;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use App\Repository\NotificationRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use App\Controller\GetUserNotificationsController;
use App\Controller\Notification\AddNotificationReadAction;
use Symfony\Component\Serializer\Annotation\Groups;


#[ORM\Entity(repositoryClass: NotificationRepository::class)]
#[ORM\InheritanceType("JOINED")]
#[ORM\DiscriminatorColumn(name:"notification_type", type:"string")]
#[ORM\DiscriminatorMap(["postNotification" => PostNotification::class,"postCommentNotification" => PostCommentNotification::class])]
#[ApiResource(
    normalizationContext: [
        'groups' => ['notif_read']
    ],
    operations: [
        new Get(),
        new GetCollection(),
        new Put(),
        new Patch(),
        new Delete(),
        new MetadataPost(),
        new MetadataPost(
            uriTemplate: '/notifications/{id}/read',
            controller: AddNotificationReadAction::class,
            deserialize: false
        ),
        
    ]
)]
class Notification
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['notif_read','users_read'])]
    private ?int $id = null;

    #[ORM\ManyToMany(targetEntity: User::class, inversedBy: 'notifications')]
    #[Groups(['notif_read'])]
    private Collection $receivers;

    #[ORM\Column]
    #[Groups(['notif_read'])]
    private ?int $type = null;

    #[ORM\ManyToMany(targetEntity: Author::class, inversedBy: 'notificationsRead')]
    private Collection $readBy;

    

    public function __construct()
    {
        $this->receivers = new ArrayCollection();
        $this->readBy = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection<int, User>
     */
    public function getReceivers(): Collection
    {
        return $this->receivers;
    }

    public function addReceiver(User $receiver): static
    {
        if (!$this->receivers->contains($receiver)) {
            $this->receivers->add($receiver);
        }

        return $this;
    }

    public function removeReceiver(User $receiver): static
    {
        $this->receivers->removeElement($receiver);

        return $this;
    }

    public function getType(): ?int
    {
        return $this->type;
    }

    public function setType(int $type): static
    {
        $this->type = $type;

        return $this;
    }

    /**
     * @return Collection<int, Author>
     */
    public function getReadBy(): Collection
    {
        return $this->readBy;
    }

    public function addReadBy(Author $readBy): static
    {
        if (!$this->readBy->contains($readBy)) {
            $this->readBy->add($readBy);
        }

        return $this;
    }

    public function removeReadBy(Author $readBy): static
    {
        $this->readBy->removeElement($readBy);

        return $this;
    }

}
