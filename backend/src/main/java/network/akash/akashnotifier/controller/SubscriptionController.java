package network.akash.akashnotifier.controller;

import lombok.RequiredArgsConstructor;
import network.akash.akashnotifier.dto.Subscription;
import network.akash.akashnotifier.service.SubscriptionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/subscription"
        , produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class SubscriptionController {
    private final SubscriptionService service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Subscription create(Subscription subscription) {
        return service.save(subscription);
    }

    @PutMapping("{akashAddress}/{telegramId}")
    public Subscription update(@PathVariable int telegramId
            , @PathVariable String akashAddress
            , Subscription subscription) {
        return service.update(telegramId, akashAddress, subscription);
    }

    @DeleteMapping("{akashAddress}/{telegramId}")
    public void delete(@PathVariable int telegramId
            , @PathVariable String akashAddress) {
        service.delete(telegramId, akashAddress);
    }

    @GetMapping("{akashAddress}/{telegramId}")
    public Subscription get(@PathVariable int telegramId
            , @PathVariable String akashAddress) {
        return service.findByTelegramIdAndAkashAddress(telegramId, akashAddress);
    }
}
