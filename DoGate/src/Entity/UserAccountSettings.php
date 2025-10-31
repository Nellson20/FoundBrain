<?php

namespace App\Entity;

use App\Repository\UserAccountSettingsRepository;
use App\Enum\Sitelang;
use Doctrine\ORM\Mapping as ORM;
use DateTimeImmutable;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: UserAccountSettingsRepository::class)]
#[ApiResource(
    operations: [
        new Get(
            normalizationContext: ['groups' => ['settings:read']],
            security: "object.getUser() == user"
        ),
        new Put(
            denormalizationContext: ['groups' => ['settings:write']],
            security: "object.getUser() == user"
        ),
        new Patch(
            denormalizationContext: ['groups' => ['settings:write']],
            security: "object.getUser() == user"
        ),
        new Post(
            denormalizationContext: ['groups' => ['settings:write']],
            security: "is_granted('ROLE_USER')"
        )
    ],
    normalizationContext: ['groups' => ['settings:read']]
)]
class UserAccountSettings
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['settings:read'])]
    private ?int $id = null;

    // 🗺️ Relation vers l'entité Pays (ManyToOne)
    #[ORM\ManyToOne(targetEntity: Pays::class)]
    #[ORM\JoinColumn(nullable: true)]
    private ?Pays $country = null;

    // 🌐 Enum Langue (FR, EN, MG)
    #[ORM\Column(enumType: Sitelang::class, options: ['default' => 'FR'])]
    #[Groups(['settings:read', 'settings:write'])]
    private Sitelang $lang = Sitelang::FR;

    // ✅ Actif ou non
    #[ORM\Column(type: 'boolean', options: ['default' => true])]
    #[Groups(['settings:read', 'settings:write'])]
    private bool $active = true;

    // 👤 Relation OneToOne avec User
    #[ORM\OneToOne(inversedBy: 'accountSettings', targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    // ⏳ Dates désactivation et suppression
    #[ORM\Column(type: 'datetime_immutable', nullable: true)]
    private ?DateTimeImmutable $disabledAt = null;

    #[ORM\Column(type: 'datetime_immutable', nullable: true)]
    private ?DateTimeImmutable $deletedAt = null;

    // --- Getters & Setters ---

    public function getId(): ?int
    {
        return $this->id;
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

    public function getLang(): Sitelang
    {
        return $this->lang;
    }

    public function setLang(Sitelang $lang): static
    {
        $this->lang = $lang;
        return $this;
    }

    public function isActive(): bool
    {
        return $this->active;
    }

    public function setActive(bool $active): static
    {
        $this->active = $active;
        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(User $user): static
    {
        $this->user = $user;
        return $this;
    }

    public function getDisabledAt(): ?DateTimeImmutable
    {
        return $this->disabledAt;
    }

    public function setDisabledAt(?DateTimeImmutable $disabledAt): static
    {
        $this->disabledAt = $disabledAt;
        return $this;
    }

    public function getDeletedAt(): ?DateTimeImmutable
    {
        return $this->deletedAt;
    }

    public function setDeletedAt(?DateTimeImmutable $deletedAt): static
    {
        $this->deletedAt = $deletedAt;
        return $this;
    }
}
