<?php

namespace App\Entity;

use App\Repository\UserVisibilitySettingsRepository;
use Doctrine\ORM\Mapping as ORM;
use DateTimeImmutable;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: UserVisibilitySettingsRepository::class)]
class UserVisibilitySettings
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['settings:read'])]
    private ?int $id = null;

    #[ORM\Column(type: 'boolean', options: ['default' => false])]
    #[Groups(['settings:read', 'settings:write'])]
    private bool $private = false;

    #[ORM\Column(type: 'boolean', options: ['default' => true])]
    #[Groups(['settings:read', 'settings:write'])]
    private bool $searchEngine = true;

    #[ORM\OneToOne(inversedBy: 'visibilitySettings', targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPrivate(): ?bool
    {
        return $this->private;
    }

    public function setPrivate(bool $private): static
    {
        $this->private = $private;

        return $this;
    }

    public function getSearchEngine(): ?bool
    {
        return $this->searchEngine;
    }

    public function setSearchEngine(bool $searchEngine): static
    {
        $this->searchEngine = $searchEngine;

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
