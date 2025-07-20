<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Entity\Finance;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\BankRepository;

#[ORM\Entity(repositoryClass: BankRepository::class)]
#[ApiResource()]

class Bank extends Finance
{

    #[ORM\Column(length: 255)]
    private ?string $bankName = null;

    public function getBankName(): ?string
    {
        return $this->bankName;
    }

    public function setBankName(string $bankName): static
    {
        $this->bankName = $bankName;

        return $this;
    }

}
