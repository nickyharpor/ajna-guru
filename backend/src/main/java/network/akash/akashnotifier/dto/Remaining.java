package network.akash.akashnotifier.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Duration;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Remaining {
    private double balanceRemaining;
    private long blocksRemaining;
    private Duration estimatedTimeRemaining;
}
