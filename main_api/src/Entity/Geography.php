<?php

namespace App\Entity;

use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\GeographyRepository;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: GeographyRepository::class)]
#[ApiResource()]
class Geography
{

    #[ORM\Id]
    #[ORM\Column(type: "string", unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'App\Doctrine\Base58UuidGenerator')]
    #[Groups(['pays_read'])]   
    private ?string $id = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['pays_read'])]
    private ?string $toponymy = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['pays_read'])]
    private ?string $SituationDelimitation = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['pays_read'])]
    private ?string $relief = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['pays_read'])]
    private ?string $hydrography = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['pays_read'])]
    private ?string $geology = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['pays_read'])]
    private ?string $climate = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['pays_read'])]
    private ?string $naturalEnv = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['pays_read'])]
    private ?string $floraFauna = null;

    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    private ?Pays $country = null;

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getToponymy(): ?string
    {
        return $this->toponymy;
    }

    public function setToponymy(?string $toponymy): static
    {
        $this->toponymy = $toponymy;

        return $this;
    }

    public function getSituationDelimitation(): ?string
    {
        return $this->SituationDelimitation;
    }

    public function setSituationDelimitation(?string $SituationDelimitation): static
    {
        $this->SituationDelimitation = $SituationDelimitation;

        return $this;
    }

    public function getRelief(): ?string
    {
        return $this->relief;
    }

    public function setRelief(?string $relief): static
    {
        $this->relief = $relief;

        return $this;
    }

    public function getHydrography(): ?string
    {
        return $this->hydrography;
    }

    public function setHydrography(?string $hydrography): static
    {
        $this->hydrography = $hydrography;

        return $this;
    }

    public function getGeology(): ?string
    {
        return $this->geology;
    }

    public function setGeology(?string $geology): static
    {
        $this->geology = $geology;

        return $this;
    }

    public function getClimate(): ?string
    {
        return $this->climate;
    }

    public function setClimate(?string $climate): static
    {
        $this->climate = $climate;

        return $this;
    }

    public function getNaturalEnv(): ?string
    {
        return $this->naturalEnv;
    }

    public function setNaturalEnv(?string $naturalEnv): static
    {
        $this->naturalEnv = $naturalEnv;

        return $this;
    }

    public function getFloraFauna(): ?string
    {
        return $this->floraFauna;
    }

    public function setFloraFauna(?string $floraFauna): static
    {
        $this->floraFauna = $floraFauna;

        return $this;
    }

    public function getCountry(): ?Pays
    {
        return $this->country;
    }

    public function setCountry(?Pays $country): static
    {
        $this->country = $country;

        return $this;
    }
}
