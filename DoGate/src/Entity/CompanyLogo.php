<?php

namespace App\Entity;

use App\Entity\ImageEntity;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Patch;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Dotenv\Dotenv;
use ApiPlatform\Metadata\ApiResource;
use App\Controller\LogoCompanyController;
use App\Repository\CompanyLogoRepository;
use ApiPlatform\Metadata\Post as MetadataPost;
use Doctrine\ORM\Mapping\HasLifecycleCallbacks;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

#[ORM\Entity(repositoryClass: CompanyLogoRepository::class)]
#[HasLifecycleCallbacks]
#[ApiResource(
    operations: [
        new Get(),
        new Put(),
        new Patch(),
        new MetadataPost(
            controller: LogoCompanyController::class,
            deserialize: false,
        )
    ]
)]
#[Vich\Uploadable]
class CompanyLogo extends ImageEntity
{



    #[vich\UploadableField(mapping: 'company_logo_uri', fileNameProperty: 'fileName', size: 'fileSize')]
    private ?File $file = null;

    #[ORM\Column]
    #[Groups(['users_read', 'posts_read','company_read'])]
    private ?bool $active = true;

    #[ORM\ManyToOne(inversedBy: 'companyLogos')]
    #[ORM\JoinColumn(nullable: true)]
    private ?Company $company = null;


    public function getFile(): ?File
    {
        return $this->file;
    }

    public function setFile(?File $file): static
    {
        $this->file = $file;

        return $this;
    }

    public function isActive(): ?bool
    {
        return $this->active;
    }

    public function setActive(bool $active): static
    {
        $this->active = $active;

        return $this;
    }

    public function getCompany(): ?Company
    {
        return $this->Company;
    }

    public function setCompany(?Company $Company): self
    {
        $this->Company = $Company;

        return $this;
    }

}


















































































































































































































// created By Nyaina