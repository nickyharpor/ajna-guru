package network.akash.akashnotifier.controller;

import lombok.RequiredArgsConstructor;
import network.akash.akashnotifier.service.OwnerService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/owner"
		, produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class OwnerController {
	private final OwnerService ownerService;

	@ResponseBody
	@GetMapping(value = "/{id}")
	public String getAllActiveDeploymentsByOwner(@PathVariable String id
			, @RequestParam(defaultValue = "127") int limit
			, @RequestParam(defaultValue = "0") int offset) {
		return ownerService.getAllActiveDeploymentsByOwner(id, limit, offset);
	}

	@ResponseBody
	@GetMapping(value = "/{id}/{dseq}")
	public String getAllActiveDeploymentsByOwner(@PathVariable String id
			, @PathVariable String dseq) {
		return ownerService.getRemainingTime(id, dseq);
	}
}
