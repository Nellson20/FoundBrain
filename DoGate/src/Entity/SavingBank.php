<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\SavingBankRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SavingBankRepository::class)]
#[ApiResource()]
class SavingBank extends Finance
{

    #[ORM\Column(length: 255)]
    private ?string $savingBankName = null;


    public function getSavingBankName(): ?string
    {
        return $this->savingBankName;
    }

    public function setSavingBankName(string $savingBankName): static
    {
        $this->savingBankName = $savingBankName;

        return $this;
    }
}
