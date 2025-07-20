<?php

namespace App\Entity;

use App\Entity\Rent;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\TransportRepository;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: TransportRepository::class)]
abstract class Transport
{
    #[ORM\Id]
    #[ORM\Column(type: "string", unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'App\Doctrine\Base58UuidGenerator')]
    private string $id;

    #[ORM\Column]
    #[Assert\Type(
        type: 'integer',
        message: "{{ value }} is not a valid integer"
    )]
    #[Groups(['rent_read'])]
    private ?int $numberOfPlaces = null;

    #[ORM\Column]
    #[Assert\Type(
        type: 'boolean',
        message: "{{ value }} is not a valid boolean"
    )]
    #[Groups(['rent_read'])]
    private ?bool $insurence = null;

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getNumberOfPlaces(): ?int
    {
        return $this->numberOfPlaces;
    }

    public function setNumberOfPlaces(?int $numberOfPlaces): static
    {
        $this->numberOfPlaces = $numberOfPlaces;

        return $this;
    }

    public function isInsurence(): ?bool
    {
        return $this->insurence;
    }

    public function setInsurence(?bool $insurence): static
    {
        $this->insurence = $insurence;

        return $this;
    }
}
