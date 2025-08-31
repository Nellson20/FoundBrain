<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Config\AccessTypes;
use App\Entity\CompanyAccess;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\AccessRepository;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: AccessRepository::class)]
#[ORM\InheritanceType("JOINED")]
#[ORM\DiscriminatorColumn(name:"access_type", type:"string")]
#[ORM\DiscriminatorMap(["companyAccess" => CompanyAccess::class])]

#[ApiResource(
    normalizationContext: [
        'groups' => ['access_read']
    ],
)]
abstract class Access
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['access_read','comp_access_read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255, enumType: AccessTypes::class)]
    #[Groups(['access_read','comp_access_read'])]
    private ?AccessTypes $type = null;

    #[ORM\ManyToOne(inversedBy: 'accesses')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['access_read','comp_access_read'])]
    private ?User $user = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getType(): ?AccessTypes
    {
        return $this->type;
    }

    public function setType(AccessTypes $type): static
    {
        $this->type = $type;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }
}
