package network.akash.akashnotifier.controller;

import lombok.RequiredArgsConstructor;
import network.akash.akashnotifier.service.OwnerService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/initiation"
		, produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class InitController {
	private final OwnerService ownerService;

	@ResponseBody
	@PostMapping(value = "/{telegramId}")
	public boolean init(@PathVariable int telegramId) {
		return ownerService.runInitCommand(telegramId);
	}

	@ResponseBody
	@PostMapping(value = "/{telegramId}/{akashAddress}")
	public boolean initStart(@PathVariable int telegramId
			, @PathVariable String akashAddress) {
		return ownerService.runInitStartCommand(telegramId, akashAddress);
	}

	@ResponseBody
	@DeleteMapping(value = "/{telegramId}/{akashAddress}")
	public boolean initStop(@PathVariable int telegramId
			, @PathVariable String akashAddress) {
		return ownerService.runInitStopCommand(telegramId, akashAddress);
	}
}
