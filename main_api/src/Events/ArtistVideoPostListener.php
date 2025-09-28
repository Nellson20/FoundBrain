<?php

namespace App\Events;

use App\Entity\User;
use App\Entity\Video;
use Doctrine\ORM\Events;
use App\Entity\ArtistVideo;
use Doctrine\Common\EventSubscriber;
use Symfony\Bundle\SecurityBundle\Security;
use Doctrine\Persistence\Event\LifecycleEventArgs;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpKernel\Exception\HttpException;

class ArtistVideoPostListener implements EventSubscriber
{
    public function getSubscribedEvents()
    {
        return[ Events::prePersist];
    }

    public function __construct(private Security $security)
    {
    }

    public function prePersist(LifecycleEventArgs $args)
    {
        
        $entity = $args->getObject();
        $currentUser = $this->security->getUser();
        
        if ($entity instanceof ArtistVideo) {
            $videoSize = $entity->getFileSize();
            $videoFile = $entity->getFile();
            if ($currentUser instanceof User) {
                $artist = $currentUser->getArtist();
                $entity->setArtist($artist);
            }

            if ($videoSize > Video::MAX_SIZE_VIDEO)
                throw new HttpException(422, "Erreur: La taille de la vidéo ne doit pas dépasser 100 Mo");

            if ($videoFile instanceof UploadedFile)
            {
                $videoFormat = $videoFile->guessExtension();
    
                    if (!in_array($videoFormat, ['mp4', 'mkv', 'avi', 'flv', 'wmv', 'mov'])) 
                        throw new HttpException(422, "Erreur: Le format de la vidéo n'est pas valide");
        
            }
        }
    }
}