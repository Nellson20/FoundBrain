<?php

namespace App\Entity;

use App\Repository\UserNotificationSettingsRepository;
use App\Enum\EventType;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: UserNotificationSettingsRepository::class)]
class UserNotificationSettings
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['settings:read'])]
    private ?int $id = null;

    #[ORM\Column(type: "string", enumType: EventType::class)]
    #[Groups(['settings:read', 'settings:write'])]
    private EventType $eventType;
    
    #[ORM\Column(type: 'boolean', options: ['default' => true])]
    #[Groups(['settings:read', 'settings:write'])]
    private bool $notificationPush = true;

    #[ORM\Column(type: 'boolean', options: ['default' => true])]
    #[Groups(['settings:read', 'settings:write'])]
    private bool $notificationInAPP = true;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'notificationSettings')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;



    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEventType(): EventType
    {
        return $this->eventType;
    }

    public function setEventType(EventType $eventType): static
    {
        $this->eventType = $eventType;

        return $this;
    }

    public function getNotificationPush(): ?bool
    {
        return $this->notificationPush;
    }

    public function setNotificationPush(bool $notificationPush): static
    {
        $this->notificationPush = $notificationPush;

        return $this;
    }

    public function getNotificationInAPP(): ?bool
    {
        return $this->notificationInAPP;
    }

    public function setNotificationInAPP(bool $notificationInAPP): static
    {
        $this->notificationInAPP = $notificationInAPP;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(User $user): static
    {
        $this->user = $user;

        return $this;
    }
}
