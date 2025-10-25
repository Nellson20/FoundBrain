<?php

namespace App\Entity;

use App\Repository\DesactivationRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: DesactivationRepository::class)]
class Desactivation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'Desactivation')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $deactivateDate = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $deleteDate = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }

    public function getDeactivateDate(): ?\DateTimeImmutable
    {
        return $this->deactivateDate;
    }

    public function setDeactivateDate(?\DateTimeImmutable $deactivateDate): static
    {
        $this->deactivateDate = $deactivateDate;

        return $this;
    }

    public function getDeleteDate(): ?\DateTimeImmutable
    {
        return $this->deleteDate;
    }

    public function setDeleteDate(?\DateTimeImmutable $deleteDate): static
    {
        $this->deleteDate = $deleteDate;

        return $this;
    }
}
