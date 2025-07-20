<?php

namespace App\Entity;

use App\Config\RulesType;
use App\Repository\RulesRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: RulesRepository::class)]
class Rules
{
    #[ORM\Id]
    #[ORM\Column(type: "string", unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'App\Doctrine\Base58UuidGenerator')]
    private ?string $id = null;

    #[ORM\Column(type: "string", enumType: RulesType::class)]
    #[Groups(['hotel_read'])]
    #[Assert\NotBlank(message:"Le type de la règle est requis.")]
    #[Assert\Choice(
        callback:[RulesType::class,'values'],
        message:"Vous devez choisir entre {{ choices }}"
    )]
    private $name = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['hotel_read'])]
    #[Assert\NotBlank(message:"Le déscription de la règle est requis.")]
    private ?string $value = null;

    #[ORM\ManyToOne(inversedBy: 'rules')]
    private ?Hotel $hotel = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName() : string
    {
        return $this->name;
    }

    public function setName(?string $name)
    {
        $this->name = $name;

        return $this;
    }

    public function getValue(): ?string
    {
        return $this->value;
    }

    public function setValue(string $value): static
    {
        $this->value = $value;

        return $this;
    }

    public function getHotel(): ?Hotel
    {
        return $this->hotel;
    }

    public function setHotel(?Hotel $hotel): static
    {
        $this->hotel = $hotel;

        return $this;
    }
}
