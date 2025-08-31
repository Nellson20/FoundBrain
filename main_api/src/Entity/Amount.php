<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\AmountRepository;
use ApiPlatform\Metadata\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;



#[ORM\Entity(repositoryClass: AmountRepository::class)]
#[ApiResource]
class Amount
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;
    
    #[ORM\Column]
    #[Groups(['invest_read', 'hotel_read', 'room_read', 'bungalow_read'])]
    #[Assert\NotBlank(message:"La valeur du montant est obligatoire.")]
    #[Assert\GreaterThan(
        value:0,
        message:"La valeur du montant doit être supérieur à {{ compared_value }}."
    )]
    private ?float $value = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['invest_read','hotel_read', 'room_read'])]
    #[Assert\NotBlank(message:"Une devise est obligatoire.")]
    #[Assert\Valid()]
    private ?Currency $currency = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getValue(): ?float
    {
        return $this->value;
    }

    public function setValue(?float $value): static
    {
        $this->value = $value;

        return $this;
    }

    public function getCurrency(): ?Currency
    {
        return $this->currency;
    }

    public function setCurrency(?Currency $currency): static
    {
        $this->currency = $currency;

        return $this;
    }
}
