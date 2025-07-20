<?php

namespace App\Controller;

use Embed\Embed;
use Symfony\Component\DomCrawler\Crawler;
use Symfony\Component\Validator\Validation;
use Symfony\Component\HttpClient\HttpClient;
use Symfony\Component\BrowserKit\HttpBrowser;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Constraints\Url;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Contracts\HttpClient\Exception\ClientExceptionInterface;
use App\Validator\Constraints\UrlConstraint;

#[AsController]
class LinkPreviewController extends AbstractController
{
    #[Route('/link-preview', name: 'app_link_preview')]
    public function getLinkPreview(Request $request)
    {
        $url = $request->get('url');
        $domain = parse_url($url)['host'] ?? null;
        $isYoutubeVideo = preg_match('/^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/', $url, $matches);
        $embed=new Embed();
        $infos=$embed->get($request->get('url'));
        return $this->json([
            'title'=>$infos->title,
            'descriprtion'=>$infos->description,
            'url'=>$infos->url,
            'image'=>$infos->image,
            'icon'=>$infos->icon,
            'favicon'=>$infos->favicon,
            'metas'=>$infos->getMetas()->all()
        ]);
        // try {
        //     $client = new HttpBrowser(HttpClient::create());
        //     $crawler = $client->request('GET', $url);


        // } catch (ClientExceptionInterface $e) {
        //     return $this->json(['error' => 'Erreur de réseau'], 500);
        // }

        // $previewData = [
        //     'title' => '',
        //     'description' => '',
        //     'image' => '',
        //     'domain' => $domain
        // ];

        // // if ($isYoutubeVideo) {
        // //     $previewData = $this->handleYoutube($crawler, $url, $domain);
        // // } else {
        //     $previewData = $this->handleGeneral($crawler, $domain);
        // // }

        // return $this->json($previewData);
    }

    

    private function handleYoutube(Crawler $crawler, string $url, string $domain)
    {
        $pattern = '/(?:\/embed\/|\/watch\?v=|\/(?:embed\/|v\/|watch\?.*v=|youtu\.be\/|embed\/|v=))([^&?#]+)/';

        
        if (preg_match($pattern, $url, $matches)) {
            $videoId = $matches[1];
            $videoThumbnail = "https://img.youtube.com/vi/$videoId/maxresdefault.jpg";
            $title = $crawler->filter('title')->text();
            $description = $crawler->filter('meta[property="og:description"]')->getNode(0) ? $crawler->filter('meta[property="og:description"]')->attr('content') : ($crawler->filter('meta[name="description"]')->getNode(0) ? $crawler->filter('meta[name="description"]')->attr('content') : null);
            $image = $videoThumbnail;
        } else {
            return '';
        }
        return [
            'title' => $title,
            'description' => $description,
            'image' => $image,
            'domain' => $domain
        ];
    }

    private function handleGeneral(Crawler $crawler, string $domain)
    {
        dd($crawler->filter('link[rel="icon"]')->attr('href'));
        $title = $crawler->filter('meta[property="og:title"]')->getNode(0) ? $crawler->filter('meta[property="og:title"]')->attr('content') : $crawler->filter('title')->text();
        $description = $crawler->filter('meta[property="og:description"]')->getNode(0) ? $crawler->filter('meta[property="og:description"]')->attr('content') : ($crawler->filter('meta[name="description"]')->getNode(0) ? $crawler->filter('meta[name="description"]')->attr('content') : null);
        $image = $crawler->filter('meta[property="og:image"]')->getNode(0) ? $crawler->filter('meta[property="og:image"]')->attr('content') : 
        ($crawler->filter('link[rel="icon"]')->getNode(0) ? $crawler->filter('link[rel="icon"]')->attr('href') : null);

        return [
            'title' => $title,
            'description' => $description,
            'image' => $image,
            'domain' => $domain
        ];
    }
}
