<?php

namespace App\Entity;

use App\Entity\User;
use App\Entity\Invest;
use App\Entity\Company;
use App\Entity\Contact;
use App\Entity\CoverImage;
use App\Entity\Reservation;
use ApiPlatform\Metadata\Get;
use App\Config\ContactStatus;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\AuthorRepository;
use ApiPlatform\Metadata\ApiResource;
use Doctrine\Common\Collections\Collection;
use App\Controller\GetAuthorContactsController;
use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: AuthorRepository::class)]
#[ApiResource(
    normalizationContext:[
        "groups"=> 'author_read'
    ]
)]
#[ORM\InheritanceType("JOINED")]
#[ORM\DiscriminatorColumn(name:"author_type", type:"string")]
#[ORM\DiscriminatorMap([
    "user" => User::class,
    "company" => Company::class, 
    "artist" => Artist::class,
])]

#[ApiResource(
   operations:[
    new Get(
        uriTemplate: '/authors/{id}/contacts',
        controller: GetAuthorContactsController::class,
        deserialize: false
    ),
   ]
 )]
abstract class Author
{

    #[ORM\Id]
    #[ORM\Column(type: "string", unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'App\Doctrine\Base58UuidGenerator')]
    #[Groups(['posts_read','image_read','discu_read','users_read', 'invest_read', 'company_read', 'ct_read','contact_read','msg_read','notif_read','job_offers_read','eval_read','author_read','comment_read','reply_read', 'reservation_read','access_read','comp_access_read', 'artist_read'])]
    private ?string $id = null;

    #[ORM\OneToMany(mappedBy: 'author', targetEntity: Post::class, orphanRemoval: true)]
    private Collection $posts;

    #[ORM\OneToMany(mappedBy: 'author', targetEntity: Comment::class, orphanRemoval: true)]
    private Collection $comments;

    #[ORM\OneToMany(mappedBy: 'author', targetEntity: Company::class, orphanRemoval: true)]
    private Collection $companies;

    #[ORM\OneToMany(mappedBy: 'author', targetEntity: Invest::class, orphanRemoval: true)]
    #[Groups([ 'ct_read'])]
    private Collection $invests;

    #[ORM\OneToMany(targetEntity:Contact::class, mappedBy:"requester")]
    private $sentRequests;

    #[ORM\OneToMany(targetEntity:Contact::class, mappedBy:"receiver")]
    private $receivedRequests;

    #[ORM\OneToMany(mappedBy: 'author', targetEntity: JobOffer::class)]
    private Collection $jobOffers;

    #[ORM\OneToMany(mappedBy: 'author', targetEntity: Evaluation::class, orphanRemoval: true)]
    private Collection $evaluations;

    #[ORM\OneToMany(mappedBy: 'author', targetEntity: Recommended::class)]
    private Collection $recommendeds;

    #[ORM\OneToMany(mappedBy: 'author', targetEntity: CoverImage::class, orphanRemoval: true)]
    #[Groups(['image_read','discu_read','msg_read'])]
    private Collection $coverImages;

    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    #[Groups(['image_read','author_read','users_read'])]
    private ?CoverImage $activeCoverImage = null;

    #[ORM\OneToMany(mappedBy: 'author', targetEntity: Playlist::class, orphanRemoval: true)]
    private Collection $playlists;

    #[ORM\Column(nullable: false)]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\OneToMany(mappedBy: 'author', targetEntity: Reservation::class)]
    private Collection $reservation;

    #[ORM\OneToMany(mappedBy: 'author', targetEntity: Coordinate::class, orphanRemoval: true)]
    private Collection $coordinates;

    #[ORM\Column(nullable: true)]
    #[Groups(['posts_read','image_read','discu_read','users_read', 'invest_read', 'company_read', 'ct_read','contact_read','msg_read','job_offers_read','eval_read','author_read','comment_read','reply_read', 'reservation_read','access_read','comp_access_read', 'artist_read'])]
    private ?bool $isOnline = null;

    #[ORM\ManyToMany(targetEntity: Notification::class, mappedBy: 'readBy')]
    private Collection $notificationsRead;

    public function __construct()
    {
        $this->posts = new ArrayCollection();
        $this->comments = new ArrayCollection();
        $this->companies = new ArrayCollection();
        $this->invests = new ArrayCollection();
        $this->sentRequests = new ArrayCollection();
        $this->receivedRequests = new ArrayCollection();
        $this->jobOffers = new ArrayCollection();
        $this->evaluations = new ArrayCollection();
        $this->recommendeds = new ArrayCollection();
        $this->playlists = new ArrayCollection();
        $this->createdAt=new \DateTimeImmutable();
        $this->reservation = new ArrayCollection();
        $this->coordinates = new ArrayCollection();
        $this->notificationsRead = new ArrayCollection();
    }

    public function getId(): ?string
    {
        return $this->id;
    }

    /**
     * @return Collection<int, Post>
     */
    public function getPosts(): Collection
    {
        return $this->posts;
    }

    public function addPost(Post $post): static
    {
        if (!$this->posts->contains($post)) {
            $this->posts->add($post);
            $post->setAuthor($this);
        }

        return $this;
    }

    public function removePost(Post $post): static
    {
        if ($this->posts->removeElement($post)) {
            if ($post->getAuthor() === $this) {
                $post->setAuthor(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Comment>
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }

    public function addComment(Comment $comment): static
    {
        if (!$this->comments->contains($comment)) {
            $this->comments->add($comment);
            $comment->setAuthor($this);
        }

        return $this;
    }

    public function removeComment(Comment $comment): static
    {
        if ($this->comments->removeElement($comment)) {
            // set the owning side to null (unless already changed)
            if ($comment->getAuthor() === $this) {
                $comment->setAuthor(null);
            }
        }

        return $this;
    }



    /**
     * @return Collection<int, Company>
     */
    public function getCompanies(): Collection
    {
        return $this->companies;
    }

    public function addCompany(Company $company): static
    {
        if (!$this->companies->contains($company)) {
            $this->companies->add($company);
            $company->setAuthor($this);
        }

        return $this;
    }

    public function removeCompany(Company $company): static
    {
        if ($this->companies->removeElement($company)) {
            // set the owning side to null (unless already changed)
            if ($company->getAuthor() === $this) {
                $company->setAuthor(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, invest>
     */
    public function getInvests(): Collection
    {
        return $this->invests;
    }

    public function addInvest(Invest $invest): static
    {
        if (!$this->invests->contains($invest)) {
            $this->invests->add($invest);
            $invest->setAuthor($this);
        }
    
        return $this;
    }
    
    public function removeInvest(Invest $invest): static
    {
        if ($this->invests->removeElement($invest)) {
            // set the owning side to null (unless already changed)
            if ($invest->getAuthor() === $this) {
                $invest->setAuthor(null);
            }
        }
    
        return $this;
    }

    
    public function getSentRequests(): Collection
    {
        return $this->sentRequests;
    }

    public function addSentRequest(Contact $contact): self
    {
        if (!$this->sentRequests->contains($contact)) {
            $this->sentRequests[] = $contact;
            $contact->setRequester($this);
        }

        return $this;
    }

    public function removeSentRequest(Contact $contact): self
    {
        if ($this->sentRequests->contains($contact)) {
            $this->sentRequests->removeElement($contact);
            // set the owning side to null (unless already changed)
            if ($contact->getRequester() === $this) {
                $contact->setRequester(null);
            }
        }

        return $this;
    }

    public function getReceivedRequests(): Collection
    {
        return $this->receivedRequests;
    }

    public function addReceivedRequest(Contact $contact): self
    {
        if (!$this->receivedRequests->contains($contact)) {
            $this->receivedRequests[] = $contact;
            $contact->setReceiver($this);
        }

        return $this;
    }

    public function removeReceivedRequest(Contact $contact): self
    {
        if ($this->receivedRequests->contains($contact)) {
            $this->receivedRequests->removeElement($contact);
            // set the owning side to null (unless already changed)
            if ($contact->getReceiver() === $this) {
                $contact->setReceiver(null);
            }
        }

        return $this;
    }

    /**
     * Get accepted contacts
     *
     * @return Collection|Author[]
     */
    public function getContacts(): Collection
    {
        $sentAccepted = $this->sentRequests->filter(function(Contact $contact) {
            return $contact->getStatus() === ContactStatus::ACCEPTED;
        })->map(function(Contact $contact) {
            return $contact->getReceiver();
        });

        $receivedAccepted = $this->receivedRequests->filter(function(Contact $contact) {
            return $contact->getStatus() === ContactStatus::ACCEPTED;
        })->map(function(Contact $contact) {
            return $contact->getRequester();
        });

        return new ArrayCollection(array_merge($sentAccepted->toArray(), $receivedAccepted->toArray()));
    }

    /**
     * @return Collection<int, JobOffer>
     */
    public function getJobOffers(): Collection
    {
        return $this->jobOffers;
    }

    public function addJobOffer(JobOffer $jobOffer): static
    {
        if (!$this->jobOffers->contains($jobOffer)) {
            $this->jobOffers->add($jobOffer);
            $jobOffer->setAuthor($this);
        }

        return $this;
    }

    public function removeJobOffer(JobOffer $jobOffer): static
    {
        if ($this->jobOffers->removeElement($jobOffer)) {
            // set the owning side to null (unless already changed)
            if ($jobOffer->getAuthor() === $this) {
                $jobOffer->setAuthor(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Evaluation>
     */
    public function getEvaluations(): Collection
    {
        return $this->evaluations;
    }

    public function addEvaluation(Evaluation $evaluation): static
    {
        if (!$this->evaluations->contains($evaluation)) {
            $this->evaluations->add($evaluation);
            $evaluation->setAuthor($this);
        }

        return $this;
    }

    public function removeEvaluation(Evaluation $evaluation): static
    {
        if ($this->evaluations->removeElement($evaluation)) {
            // set the owning side to null (unless already changed)
            if ($evaluation->getAuthor() === $this) {
                $evaluation->setAuthor(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Recommended>
     */
    public function getRecommendeds(): Collection
    {
        return $this->recommendeds;
    }

    public function addRecommended(Recommended $recommended): static
    {
        if (!$this->recommendeds->contains($recommended)) {
            $this->recommendeds->add($recommended);
            $recommended->setAuthor($this);
        }

        return $this;
    }

    public function removeRecommended(Recommended $recommended): static
    {
        if ($this->recommendeds->removeElement($recommended)) {
            // set the owning side to null (unless already changed)
            if ($recommended->getAuthor() === $this) {
                $recommended->setAuthor(null);
            }
        }

        return $this;
    }


    /**
     * @return Collection<int, CoverImage>
     */
    public function getCoverImages(): Collection
    {
        return $this->coverImages;
    }

    public function addCoverImage(CoverImage $coverImage): static
    {
        if (!$this->coverImages->contains($coverImage)) {
            $this->coverImages->add($coverImage);
            $coverImage->setAuthor($this);
        }

        return $this;
    }

    public function removeCoverImage(CoverImage $coverImage): static
    {
        if ($this->coverImages->removeElement($coverImage)) {
            // set the owning side to null (unless already changed)
            if ($coverImage->getAuthor() === $this) {
                $coverImage->setAuthor(null);
            }
        }

        return $this;
    }

    public function getActiveCoverImage(): ?CoverImage
    {
        return $this->activeCoverImage;
    }

    public function setActiveCoverImage(?CoverImage $activeCoverImage): static
    {
        $this->activeCoverImage = $activeCoverImage;

        return $this;
    }

    /**
     * @return Collection<int, Playlist>
     */
    public function getPlaylists(): Collection
    {
        return $this->playlists;
    }

    public function addPlaylist(Playlist $playlist): static
    {
        if (!$this->playlists->contains($playlist)) {
            $this->playlists->add($playlist);
            $playlist->setAuthor($this);
        }
        return $this;
    }
    

    public function removePlaylist(Playlist $playlist): static
    {
        if ($this->playlists->removeElement($playlist)) {
            // set the owning side to null (unless already changed)
            if ($playlist->getAuthor() === $this) {
                $playlist->setAuthor(null);
            }
            return $this;
        }
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

    /**
     * @return Collection<int, Reservation>
     */
    public function getReservation(): Collection
    {
        return $this->reservation;
    }

    public function addReservation(Reservation $reservation): static
    {
        if (!$this->reservation->contains($reservation)) {
            $this->reservation->add($reservation);
            $reservation->setAuthor($this);
        }

        return $this;
    }

    public function removeReservation(Reservation $reservation): static
    {
        if ($this->reservation->removeElement($reservation)) {
            // set the owning side to null (unless already changed)
            if ($reservation->getAuthor() === $this) {
                $reservation->setAuthor(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Coordinate>
     */
    public function getCoordinates(): Collection
    {
        return $this->coordinates;
    }

    public function addCoordinate(Coordinate $coordinate): static
    {
        if (!$this->coordinates->contains($coordinate)) {
            $this->coordinates->add($coordinate);
            $coordinate->setAuthor($this);
        }

        return $this;
    }

    public function removeCoordinate(Coordinate $coordinate): static
    {
        if ($this->coordinates->removeElement($coordinate)) {
            // set the owning side to null (unless already changed)
            if ($coordinate->getAuthor() === $this) {
                $coordinate->setAuthor(null);
            }
        }

        return $this;
    }

    public function isIsOnline(): ?bool
    {
        return $this->isOnline;
    }

    public function setIsOnline(?bool $isOnline): static
    {
        $this->isOnline = $isOnline;

        return $this;
    }

    /**
     * @return Collection<int, Notification>
     */
    public function getNotificationsRead(): Collection
    {
        return $this->notificationsRead;
    }

    public function addNotificationsRead(Notification $notificationsRead): static
    {
        if (!$this->notificationsRead->contains($notificationsRead)) {
            $this->notificationsRead->add($notificationsRead);
            $notificationsRead->addReadBy($this);
        }

        return $this;
    }

    public function removeNotificationsRead(Notification $notificationsRead): static
    {
        if ($this->notificationsRead->removeElement($notificationsRead)) {
            $notificationsRead->removeReadBy($this);
        }

        return $this;
    }
    

   
}

