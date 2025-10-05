namespace VendaVeiculosApi.DTOs;

public class PagamentoDTO
{
    public int Id { get; set; }
    public int AluguelId { get; set; }
    public DateTime DataPagamento { get; set; }
    public decimal Valor { get; set; }
    public string Metodo { get; set; } = string.Empty;
}
