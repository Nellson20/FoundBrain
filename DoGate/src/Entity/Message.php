<?php

namespace App\Entity;

use App\Controller\AddMessageController;
use App\Entity\Discussion;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Post as MetadataPost;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use PhpParser\Node\Attribute;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\Post as PostMetadata;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    normalizationContext: [
        'groups' => ['msg_read']
    ],
    order: ["createdAt" => "DESC"],
    operations: [
        new Get(),
        new GetCollection(),
        new Put(),
        new Patch(),
        new Delete(),
        new MetadataPost(
            controller: AddMessageController::class,
            deserialize: false
        ),
    ]
)]
#[ApiResource(
    normalizationContext: [
        'groups' => ['msg_read']
    ],
    order:["createdAt"=>"DESC"],
    uriTemplate: '/discussions/{id}/messages', 
    uriVariables: [
        'id' => new Link(
            fromClass: Discussion::class,
            fromProperty: 'messages'
        )
    ], 
    operations: [
        new GetCollection(),
        new PostMetadata()
    ]
)]
#[ORM\Entity]
class Message
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: "integer")]
    #[Groups(['users_read','discu_read','msg_read'])]
    private $id;

    #[ORM\ManyToOne(targetEntity: Author::class)]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['posts_read','discu_read','msg_read'])]
    private ?Author $author = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['users_read','discu_read','msg_read'])]
    private ?string $content = null;

    #[ORM\Column]
    #[Groups(['users_read','discu_read','msg_read'])]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column]
    #[Groups(['users_read','discu_read','msg_read'])]
    private ?\DateTimeImmutable $updatedAt = null;

    #[ORM\ManyToOne(inversedBy: 'messages')]
    #[Groups(['users_read','discu_read','msg_read'])]
    private ?Discussion $discussion = null;

    #[ORM\OneToMany(mappedBy: 'message', targetEntity: MessagePicture::class, orphanRemoval: true,cascade:["persist"])]
    #[Groups(['discu_read','msg_read'])]
    private Collection $pictures;

    #[ORM\OneToOne(inversedBy: 'message', cascade: ['persist', 'remove'])]
    #[Groups(['discu_read','msg_read'])]
    private ?MessageAudio $audio = null;

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
        $this->updatedAt = new \DateTimeImmutable();
        $this->pictures = new ArrayCollection();
    }

    public function getId()
    {
        return $this->id;
    }
    public function getAuthor(): ?Author
    {
        return $this->author;
    }

    public function setAuthor(?Author $author): static
    {
        $this->author = $author;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(?string $content): static
    {
        $this->content = $content;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTimeImmutable $updatedAt): static
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getDiscussion(): ?Discussion
    {
        return $this->discussion;
    }

    public function setDiscussion(?Discussion $discussion): static
    {
        $this->discussion = $discussion;

        return $this;
    }

    /**
     * @return Collection<int, MessagePicture>
     */
    public function getPictures(): Collection
    {
        return $this->pictures;
    }

    public function addPicture(MessagePicture $picture): static
    {
        if (!$this->pictures->contains($picture)) {
            $this->pictures->add($picture);
            $picture->setMessage($this);
        }

        return $this;
    }

    public function removePicture(MessagePicture $picture): static
    {
        if ($this->pictures->removeElement($picture)) {
            // set the owning side to null (unless already changed)
            if ($picture->getMessage() === $this) {
                $picture->setMessage(null);
            }
        }

        return $this;
    }

    public function getAudio(): ?MessageAudio
    {
        return $this->audio;
    }

    public function setAudio(?MessageAudio $audio): static
    {
        $this->audio = $audio;

        return $this;
    }
}
