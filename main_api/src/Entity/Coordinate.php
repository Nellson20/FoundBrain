<?php

namespace App\Entity;


use Doctrine\ORM\Mapping as ORM;
use App\Repository\CoordinateRepository;
use Symfony\Component\Serializer\Annotation\Groups; 

#[ORM\Entity(repositoryClass: CoordinateRepository::class)]
#[ORM\InheritanceType('JOINED')]
#[ORM\DiscriminatorColumn(name:"discriminator", type: "string")]
#[ORM\DiscriminatorMap([
    'email' => Email::class,
    'phoneNumber' => PhoneNumber::class,
])]
abstract class Coordinate
{
    #[ORM\Id]
    #[ORM\Column(type: "string", unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'App\Doctrine\Base58UuidGenerator')]
    private ?string $id = null;

    #[ORM\Column(length: 255,nullable:true)]
    #[Groups(['hotel_read'])]
    private ?string $reference = null;

    #[ORM\ManyToOne(inversedBy: 'coordinates')]
    private ?Author $author = null;

    #[ORM\ManyToOne(inversedBy: 'coordinates')]
    private ?Fonctionnality $fonctionnality = null;

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getReference(): ?string
    {
        return $this->reference;
    }

    public function setReference(?string $reference): static
    {
        $this->reference = $reference;

        return $this;
    }

    public function getAuthor(): ?Author
    {
        return $this->author;
    }

    public function setAuthor(?Author $author): static
    {
        $this->author = $author;

        return $this;
    }

    public function getFonctionnality(): ?Fonctionnality
    {
        return $this->fonctionnality;
    }

    public function setFonctionnality(?Fonctionnality $fonctionnality): static
    {
        $this->fonctionnality = $fonctionnality;

        return $this;
    }
}
