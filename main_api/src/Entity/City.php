<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Serializer\Filter\GroupFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\CityRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CityRepository::class)]
#[ApiResource(
    normalizationContext:[
        'groups' => ['pays_read','cities_read']
    ]
)]
#[ApiFilter(SearchFilter::class, properties:['name'=>'istart','country.name'=>'istart'])]
#[ApiFilter(GroupFilter::class, arguments: ['parameterName' => 'groups', 'overrideDefaultGroups' => false, 'whitelist' => ['cities_read','cities_names']])]
class City
{
    #[ORM\Id]
    #[ORM\Column(type: "string", unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'App\Doctrine\Base58UuidGenerator')]
    #[Groups(['pays_read', 'cities_read', 'hotel_read','cities_names'])]
    private ?string $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['pays_read', 'cities_read', 'hotel_read','cities_names'])]
    private ?string $name = null;

    #[ORM\ManyToOne(inversedBy: 'cities')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['cities_read', 'hotel_read'])]
    private ?Pays $country = null;

    #[ORM\OneToMany(mappedBy: 'cities', targetEntity: Citythumbnail::class)]
    private Collection $citythumbnails;
    
    #[ORM\OneToMany(mappedBy: 'city', targetEntity: Fonctionnality::class)]
    private Collection $fonctionnalities;

    #[ORM\OneToMany(mappedBy: 'city', targetEntity: Street::class)]
    private Collection $streets;

    public function __construct()
    {
        $this->fonctionnalities = new ArrayCollection();
        $this->citythumbnails = new ArrayCollection();
        $this->streets = new ArrayCollection();
    }

    public function getId(): ?string
    {
        return $this->id;
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

    public function getCountry(): ?Pays
    {
        return $this->country;
    }

    public function setCountry(?Pays $country): static
    {
        $this->country = $country;

        return $this;
    }

    /**
     * @return Collection<int, Citythumbnail>
     */
    public function getCitythumbnails(): Collection
    {
        return $this->citythumbnails;
    }

    public function addCitythumbnail(Citythumbnail $citythumbnail): static
    {
        if (!$this->citythumbnails->contains($citythumbnail)) {
            $this->citythumbnails->add($citythumbnail);
            $citythumbnail->setCities($this);
        }

        return $this;
    }

    public function removeCitythumbnail(Citythumbnail $citythumbnail): static
    {
        if ($this->citythumbnails->removeElement($citythumbnail)) {
            // set the owning side to null (unless already changed)
            if ($citythumbnail->getCities() === $this) {
                $citythumbnail->setCities(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Fonctionnality>
     */
    public function getFonctionnalities(): Collection
    {
        return $this->fonctionnalities;
    }

    public function addFonctionnality(Fonctionnality $fonctionnality): static
    {
        if (!$this->fonctionnalities->contains($fonctionnality)) {
            $this->fonctionnalities->add($fonctionnality);
            $fonctionnality->setCity($this);
        }

        return $this;
    }

    public function removeFonctionnality(Fonctionnality $fonctionnality): static
    {
        if ($this->fonctionnalities->removeElement($fonctionnality)) {
            // set the owning side to null (unless already changed)
            if ($fonctionnality->getCity() === $this) {
                $fonctionnality->setCity(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Street>
     */
    public function getStreets(): Collection
    {
        return $this->streets;
    }

    public function addStreet(Street $street): static
    {
        if (!$this->streets->contains($street)) {
            $this->streets->add($street);
            $street->setCity($this);
        }

        return $this;
    }

    public function removeStreet(Street $street): static
    {
        if ($this->streets->removeElement($street)) {
            // set the owning side to null (unless already changed)
            if ($street->getCity() === $this) {
                $street->setCity(null);
            }
        }

        return $this;
    }
}
