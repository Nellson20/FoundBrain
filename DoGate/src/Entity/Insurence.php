<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\InsurenceRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: InsurenceRepository::class)]
#[ApiResource()]
class Insurence extends Finance
{

    #[ORM\Column(length: 255)]
    private ?string $insurenceName = null;

    public function getInsurenceName(): ?string
    {
        return $this->insurenceName;
    }

    public function setInsurenceName(string $insurenceName): static
    {
        $this->insurenceName = $insurenceName;

        return $this;
    }
}
