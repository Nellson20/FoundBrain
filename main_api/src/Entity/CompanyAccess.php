<?php

namespace App\Entity;

use App\Entity\Access;
use App\Entity\Company;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Delete;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use App\Repository\CompanyAccessRepository;
use ApiPlatform\Metadata\Post as MetadataPost;
use App\Controller\GetCompanyAccessController;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CompanyAccessRepository::class)]
#[ApiResource(
    operations: [
        new MetadataPost(),
        new Put(),
        new Patch(),
        new Delete()
    ]
)]
#[ApiResource(
    normalizationContext: [
        'groups' => ['comp_access_read']
    ],
    uriTemplate: '/companies/{id}/accesses',
    controller:GetCompanyAccessController::class,
    uriVariables: [
        'id' => new Link(
            fromClass: Company::class,
            fromProperty: 'companyAccesses'
        )
    ],
    operations: [
        new GetCollection(),
    ]
)]
class CompanyAccess extends Access
{
    #[ORM\ManyToOne(inversedBy: 'companyAccesses')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['comp_access_read'])]
    private ?Company $company = null;

    public function getCompany(): ?Company
    {
        return $this->company;
    }

    public function setCompany(?Company $company): static
    {
        $this->company = $company;

        return $this;
    }
}
