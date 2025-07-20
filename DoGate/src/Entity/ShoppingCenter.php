<?php

namespace App\Entity;
use App\Repository\ShoppingCenterRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Post as MetadataPost;
use ApiPlatform\Metadata\GetCollection;
use App\Controller\ShoppingCenterPostController;
use App\Controller\ShoppingCenterPutController;

#[ORM\Entity(repositoryClass: ShoppingCenterRepository::class)]
#[ApiResource
(
    operations:
    [
        new Get(),
        new GetCollection(),
        new Put(),
        new Delete(),
        new MetadataPost(
            controller : ShoppingCenterPostController::class,
            deserialize: false,
        ),
        new MetadataPost(
            uriTemplate: '/shoppongcenter/{id}',
            controller: ShoppingCenterPutController::class,
            deserialize:false,
        )
    ]
)
]
class ShoppingCenter extends Attraction
{
    
    #[ORM\Column(nullable: true)]
    private ?int $area = null;

    #[ORM\Column(nullable: true)]
    private ?int $floor = null;

    #[ORM\ManyToMany(targetEntity: Store::class, inversedBy: 'shoppingCenters')]
    private Collection $stores;

    public function __construct()
    {
        parent::__construct();
        $this->stores = new ArrayCollection();
    }

    public function getArea(): ?int
    {
        return $this->area;
    }

    public function setArea(?int $area): static
    {
        $this->area = $area;

        return $this;
    }

    public function getFloor(): ?int
    {
        return $this->floor;
    }

    public function setFloor(?int $floor): static
    {
        $this->floor = $floor;

        return $this;
    }

    /**
     * @return Collection<int, Store>
     */
    public function getStores(): Collection
    {
        return $this->stores;
    }

    public function addStore(Store $store): static
    {
        if (!$this->stores->contains($store)) {
            $this->stores->add($store);
        }

        return $this;
    }

    public function removeStore(Store $store): static
    {
        $this->stores->removeElement($store);

        return $this;
    }

}
?>
