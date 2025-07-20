<?php

namespace App\Events;

use App\Entity\Picture;
use Doctrine\ORM\Events;
use Doctrine\Common\EventSubscriber;
use Doctrine\Persistence\Event\LifecycleEventArgs;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Intervention\Image\ImageManagerStatic as Image;

class ImagePostListener implements EventSubscriber
{

    public function getSubscribedEvents()
    {
        return [
            Events::prePersist,
        ];
    }


    public function prePersist(LifecycleEventArgs $args)
    {
        
        $entity = $args->getObject();
        
        if ($entity instanceof Picture)
        {
            $imageFile = $entity->getFile();
            $imageSize = $imageFile->getSize();


            if ($imageSize > Picture::MAX_IMAGE_SIZE)
            {
                $image = Image::make($imageFile->getRealPath());
                $image->resize(800, null, function ($constraint)
                {
                    $constraint->aspectRatio();
                    $constraint->upsize();
                });
                $image->save($imageFile->getRealPath(), 75);
                
            }
            $imageFormat = $imageFile->guessExtension();
    
            if (!in_array($imageFormat, ['jpg', 'jpeg', 'png', 'svg', 'gif', 'webp']))
                throw new HttpException(422, "Erreur: Le format de l'image n'est pas valide");

        }
    }
}
