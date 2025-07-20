<?php

namespace App\Entity;

use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\LeaderRepository;
use ApiPlatform\Metadata\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: LeaderRepository::class)]
#[ApiResource(
    normalizationContext:[
        'groups' => ['pays_read','leader_read']
        ]
)]
class Leader
{
    #[ORM\Id]
    #[ORM\Column(type: "string", unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'App\Doctrine\Base58UuidGenerator')]
    #[Groups(['pays_read','leader_read'])]
    private ?string $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['pays_read','leader_read'])]
    private ?string $type = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['pays_read','leader_read'])]
    private ?string $name = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    #[Groups(['pays_read','leader_read'])]
    private ?\DateTimeInterface $startOfMandate = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    #[Groups(['pays_read','leader_read'])]
    private ?\DateTimeInterface $endOfMandate = null;

    #[ORM\ManyToOne(inversedBy: 'leaders')]
    private ?Pays $countrie = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['pays_read','leader_read'])]
    private ?string $pdtImg = null;

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): static
    {
        $this->type = $type;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getStartOfMandate(): ?\DateTimeInterface
    {
        return $this->startOfMandate;
    }

    public function setStartOfMandate(?\DateTimeInterface $startOfMandate): static
    {
        $this->startOfMandate = $startOfMandate;

        return $this;
    }

    public function getEndOfMandate(): ?\DateTimeInterface
    {
        return $this->endOfMandate;
    }

    public function setEndOfMandate(?\DateTimeInterface $endOfMandate): static
    {
        $this->endOfMandate = $endOfMandate;

        return $this;
    }

    public function getCountrie(): ?Pays
    {
        return $this->countrie;
    }

    public function setCountrie(?Pays $countrie): static
    {
        $this->countrie = $countrie;

        return $this;
    }

    public function getPdtImg(): ?string
    {
        return $this->pdtImg;
    }

    public function setPdtImg(?string $pdtImg): static
    {
        $this->pdtImg = $pdtImg;

        return $this;
    }
}
