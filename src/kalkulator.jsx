import { createSignal } from "solid-js";

export default function Kalkulator() {
  const [iznosKredita, postaviIznosKredita] = createSignal(0);
  const [brojGodina, postaviBrojGodina] = createSignal(0);
  const [kamatnaStopa, postaviKamatnuStopu] = createSignal(0);
  const [mjRata, postaviMjRata] = createSignal(null);
  const [ukupnoZaPlatiti, postaviUkupnoZaPlatiti] = createSignal(null);
  const [greska, postaviGresku] = createSignal('');

  const izracunajKredit = (e) => {
    e.preventDefault();
    const glavnica = Number(iznosKredita());
    const godine = Number(brojGodina());
    const kamatna = Number(kamatnaStopa()) / 100 / 12;

    if (godine > 40) {
      postaviGresku('Greška u unosu: Broj godina ne može biti veći od 40.');
      return;
    }

    if (glavnica <= 0 || godine <= 0 || kamatnaStopa() <= 0) {
      postaviGresku('Greška u unosu: Svi brojevi moraju biti pozitivni i veći od nule.');
      return;
    }

    const brojMjeseci = godine * 12;

    // Formula za izračun mjesečne rate
    const mjRataKredita = glavnica * kamatna * Math.pow(1 + kamatna, brojMjeseci) / (Math.pow(1 + kamatna, brojMjeseci) - 1);
    const ukupno = mjRataKredita * brojMjeseci;

    postaviMjRata(mjRataKredita.toFixed(2));
    postaviUkupnoZaPlatiti(ukupno.toFixed(2));
    postaviGresku(''); // Resetiramo grešku ako su svi podaci ispravni
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Kalkulator Kredita</h1>
      <form onSubmit={izracunajKredit}>
        <div>
          <label>Iznos Kredita:</label>
          <input
            type="number"
            value={iznosKredita()}
            onInput={(e) => {
              const value = e.target.value;
              if (value < 0) {
                postaviGresku('Greška u unosu: Podatak ne može biti negativan.');
              } else {
                postaviGresku('');
                postaviIznosKredita(value);
              }
            }}
          />
        </div>
        <div>
          <label>Broj Godina (maks. 40):</label>
          <input
            type="number"
            value={brojGodina()}
            onInput={(e) => {
              const value = e.target.value;
              if (value < 0) {
                postaviGresku('Greška u unosu: Podatak ne može biti negativan.');
              } else {
                postaviGresku('');
                postaviBrojGodina(value);
              }
            }}
          />
        </div>
        <div>
          <label>Kamatna Stopa (%):</label>
          <input
            type="number"
            step="0.01"
            value={kamatnaStopa()}
            onInput={(e) => {
              const value = e.target.value;
              if (value < 0) {
                postaviGresku('Greška u unosu: Podatak ne može biti negativan.');
              } else {
                postaviGresku('');
                postaviKamatnuStopu(value);
              }
            }}
          />
        </div>
        <button type="submit">Izračunaj Kredit</button>
      </form>
      {greska() && <h2 style={{ color: 'red' }}>{greska()}</h2>}
      {mjRata() !== null && <h2>Mjesečna Rata: {mjRata()} €</h2>}
      {ukupnoZaPlatiti() !== null && <h2>Ukupno za Platiti: {ukupnoZaPlatiti()} €</h2>}
    </div>
  );
}
