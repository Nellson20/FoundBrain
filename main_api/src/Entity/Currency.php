<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\CurrencyRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: CurrencyRepository::class)]
#[ApiResource]
class Currency
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['invest_read','job_offers_read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['invest_read', 'job_offers_read', 'hotel_read', 'room_read'])]
    #[Assert\NotBlank(message:"Le code de devise est obligatoire.")]
    private ?string $code = null;

    #[ORM\Column(length: 255)]
    #[Groups(['invest_read','job_offers_read'])]
    #[Assert\NotBlank(message:"Le nom de la devise est obligatoire.")]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(message:"Le symbole de la devise est obligatoire.")]
    private ?string $symbol = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCode(): ?string
    {
        return $this->code;
    }

    public function setCode(string $code): static
    {
        $this->code = $code;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getSymbol(): ?string
    {
        return $this->symbol;
    }

    public function setSymbol(string $symbol): static
    {
        $this->symbol = $symbol;

        return $this;
    }
}
